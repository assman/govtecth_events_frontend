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
    {#if data.events.length == 0}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1"
        stroke="currentColor"
        class="size-14 mx-auto mt-32"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
        />
      </svg>

      <!-- <div class="flex flex-row gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        You are all caught up
      </div> -->
    {:else}
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
    {/if}
  </ul>
</div>
