<script>
  import { goto } from "$app/navigation";
  export let data;

  const handleClick = function (eventSlug) {
    const baseUrl = "events/";
    const nextUrl = baseUrl.concat(eventSlug);

    goto(nextUrl);
  };

  function toDateTime(isoDateTime) {
    const date = new Date(isoDateTime);
    return date.toLocaleString("en-GB");
  }

  function toReadableEventType(eventType) {
    if (eventType == "unknown") return "Unknown";
    else if (eventType == "line_crossing") return "Line Crossing";
    else if (eventType == "depression") return "Depression";
    else return eventType;
  }

  function toReadableRemarks(remarks) {
    if (remarks == "false_positive") return "False Positive";
    else if (remarks == "no_remarks") return "Yet to handle";
    else if (remarks == "duplicate") return "Duplicate";
    else if (remarks == "needs_further_review") return "Needs further review";
    else return eventType;
  }
</script>

<div class="flex flex-col mt-12 gap-10">
  <h1 class="text-4xl font-bold leading-9 tracking-normal text-gray-900">
    Events
  </h1>
  <ul role="list" class="divide-y divide-gray-200">
    {#each data.events as event, i}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
      <li
        on:click={() => handleClick(event._id)}
        class="flex justify-between gap-x-6 py-5 cursor-pointer"
      >
        <div class="flex min-w-0 gap-x-4">
          {#if event.handled}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-10 fill-green-500"
            >
              <path
                fill-rule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                clip-rule="evenodd"
              />
            </svg>
          {:else}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-10 fill-orange-400"
            >
              <path
                fill-rule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                clip-rule="evenodd"
              />
            </svg>
          {/if}
          <div class="min-w-0 flex-auto">
            <p class="text-sm font-semibold leading-6 text-gray-900">
              {toReadableEventType(event.event_type)}
            </p>
            <p class="mt-1 truncate text-xs leading-5 text-gray-500">
              {toDateTime(event.detection_time)}
            </p>
          </div>
        </div>
        <div class="flex shrink-0 items-center gap-2">
          <p
            class="mt-1 text-xs leading-5 text-white {event.handled
              ? 'bg-green-500'
              : 'bg-orange-500'} rounded-lg px-2"
          >
            {toReadableRemarks(event.remarks)}
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-5 mt-1"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
      </li>
    {/each}
  </ul>
</div>
