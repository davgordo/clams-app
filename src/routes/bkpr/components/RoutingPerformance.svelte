<script lang="ts">
  import { convertValue } from '$lib/conversion'
  import { BitcoinDenomination } from '$lib/types'
  import { formatValueForDisplay } from '$lib/utils'
  import { channelsAPY$, settings$ } from '$lib/streams'
  import { translate } from '$lib/i18n/translations'
  import Spinner from '$lib/elements/Spinner.svelte'
  import ErrorMsg from '$lib/elements/ErrorMsg.svelte'
  import info from '$lib/icons/info.js'

  $: net = $channelsAPY$.data?.filter((item) => item.account === 'net')[0]
  // Format value or fees
  function formatValue(value: number | string) {
    return formatValueForDisplay({
      value: convertValue({
        value: value.toString(),
        from: BitcoinDenomination.msats,
        to: $settings$.bitcoinDenomination
      }),
      denomination: $settings$.bitcoinDenomination,
      commas: true
    })
  }

  function formatAPY(apy: string) {
    // Three decimals minus trailing zeros
    return parseFloat(Number(apy.slice(0, -1)).toFixed(3))
  }
</script>

<section
  class="p-4 border border-current rounded-md md:col-span-1 md:row-span-1 w-full flex flex-col shadow-sm shadow-purple-400"
>
  <h1 class="text-2xl w-full mb-6 font-bold">{$translate('app.headings.routing_performance')}</h1>
  <p>{$translate('app.subheadings.routing_performance')}</p>

  {#if $channelsAPY$.loading}
    <section class="w-full py-6 flex items-center justify-center">
      <Spinner />
    </section>
  {:else if $channelsAPY$.error}
    <div class="flex items-center justify-center">
      <ErrorMsg message={$channelsAPY$.error} closable={false} />
    </div>
  {:else if net}
    <div class="mt-6 flex justify-between flex-wrap gap-4 uppercase">
      <div>
        <p class="text-2xl font-bold">{formatValue(net.routed_out_msat)}</p>
        <p class="text-neutral-400">
          {$translate('app.labels.routed')} ({$settings$.bitcoinDenomination})
        </p>
      </div>
      <div>
        <p class="text-2xl font-bold">{formatValue(net.fees_out_msat)}</p>
        <p class="text-neutral-400">
          {$translate('app.labels.fees')} ({$settings$.bitcoinDenomination})
        </p>
      </div>
      <div>
        <p class="text-2xl font-bold">{formatAPY(net.apy_out)}</p>
        <p class="text-neutral-400">{$translate('app.labels.apy')} (%)</p>
      </div>
    </div>
  {:else}
    <div class="flex items-center w-full">
      <div class="text-utility-pending p-2 border border-current rounded flex items-start mt-6">
        <div class="w-6 mr-2 border border-current rounded-full">{@html info}</div>
        <span class="text-sm">{$translate('app.hints.no_routing_fees')}</span>
      </div>
    </div>
  {/if}
</section>
