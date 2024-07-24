<script>
  import { goto } from "$app/navigation";
  export let data;

  const handleClick = function (handled) {
    const baseUrl = "events";
    let queryParams = "";

    if (handled == true) {
      queryParams = "?handled=true";
    } else if (handled == false) {
      queryParams = "?handled=false";
    }
    const nextUrl = baseUrl.concat(queryParams);

    goto(nextUrl);
  };
</script>

<div class="flex flex-col mt-12 gap-10">
  <h1 class="text-4xl font-bold leading-9 tracking-normal text-gray-900">
    Dashboard
  </h1>
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
    <button
      on:click={() => handleClick(null)}
      class="bg-slate-100 rounded-lg p-4"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="size-10 fill-blue-500"
      >
        <path
          fill-rule="evenodd"
          d="M6.912 3a3 3 0 0 0-2.868 2.118l-2.411 7.838a3 3 0 0 0-.133.882V18a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-4.162c0-.299-.045-.596-.133-.882l-2.412-7.838A3 3 0 0 0 17.088 3H6.912Zm13.823 9.75-2.213-7.191A1.5 1.5 0 0 0 17.088 4.5H6.912a1.5 1.5 0 0 0-1.434 1.059L3.265 12.75H6.11a3 3 0 0 1 2.684 1.658l.256.513a1.5 1.5 0 0 0 1.342.829h3.218a1.5 1.5 0 0 0 1.342-.83l.256-.512a3 3 0 0 1 2.684-1.658h2.844Z"
          clip-rule="evenodd"
        />
      </svg>
      <div class="flex flex-row justify-between mt-6">
        <p class="text-3xl font-bold">All Events</p>
        <p class="text-3xl font-bold">{data.total_events.count}</p>
      </div>
    </button>
    <button
      on:click={() => handleClick(true)}
      class="bg-slate-100 rounded-lg p-4"
    >
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
      <div class="flex flex-row justify-between mt-6">
        <p class="text-3xl font-bold">Completed</p>
        <p class="text-3xl font-bold">{data.handled_events.count}</p>
      </div>
    </button>
    <button
      on:click={() => handleClick(false)}
      class="bg-slate-100 rounded-lg p-4"
    >
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
      <div class="flex flex-row justify-between mt-6">
        <p class="text-3xl font-bold">Pending</p>
        <p class="text-3xl font-bold">{data.pending_events.count}</p>
      </div>
    </button>
  </div>
</div>
