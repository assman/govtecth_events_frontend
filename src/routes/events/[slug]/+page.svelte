<script>
  import { invalidateAll } from "$app/navigation";
  export let data;

  //   const remarksOptions = {
  //     false_positive: "Mark as False Positive",
  //     duplicate: "Mark as Duplicate",
  //     needs_further_review: "Mark for further review",
  //   };

  //   if (data.event.remarks === "false_positive") {
  //     delete remarksOptions.false_positive;
  //   }

  //   if (data.event.remarks === "duplicate") {
  //     delete remarksOptions.duplicate;
  //   }

  //   if (data.event.remarks === "needs_further_review") {
  //     delete remarksOptions.needs_further_review;
  //   }

  const updateEventRemarks = async function (eventSlug, remarks_value) {
    const myHeaders = new Headers();
    myHeaders.append("ngrok-skip-browser-warning", "true");
    myHeaders.append("Content-Type", "application/json");

    const update_response = await fetch(
      `https://edb6-13-229-201-218.ngrok-free.app/events/${eventSlug}`,
      {
        headers: myHeaders,
        method: "PATCH",
        body: JSON.stringify({ remarks: remarks_value }),
      }
    );

    if (update_response.status == 200) {
      invalidateAll();
    }
  };

  function toReadableEventType(eventType) {
    if (eventType == "unknown") return "Unknown";
    else if (eventType == "line_crossing") return "Line Crossing";
    else if (eventType == "depression") return "Depression";
    else return eventType;
  }

  function toDateTime(isoDateTime) {
    const date = new Date(isoDateTime);
    return date.toLocaleString("en-GB");
  }

  function readableHandled(handled) {
    if (handled == true) return "Yes";
    else if (handled == false) return "No";
    else return handled;
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
    {toReadableEventType(data.event.event_type)} Event
  </h1>
  <div>
    <div class="border border-gray-100 rounded-lg">
      <dl class="divide-y divide-gray-100">
        <div class="py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-2">
          <dt class="text-sm font-semibold leading-6 text-gray-900">Handled</dt>
          <dd
            class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
          >
            {readableHandled(data.event.handled)}
          </dd>
        </div>
        <div
          class="px-2 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-2 bg-slate-100"
        >
          <dt class="text-sm font-semibold leading-6 text-gray-900">Remarks</dt>
          <dd
            class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
          >
            {toReadableRemarks(data.event.remarks)}
            {#each Object.entries(data.remarksOptions) as [value, title]}
              <div class="text-sm mt-4">
                <button
                  on:click={() => updateEventRemarks(data.event._id, value)}
                  class="font-medium text-indigo-600 hover:text-indigo-500"
                  >{title}</button
                >
              </div>
            {/each}
            <!-- <div class="text-sm mt-4">
              <button class="font-medium text-indigo-600 hover:text-indigo-500"
                >Mark as Duplicate</button
              >
            </div>
            <div class="text-sm mt-2">
              <button class="font-medium text-indigo-600 hover:text-indigo-500"
                >Mark for further review</button
              >
            </div> -->
          </dd>
        </div>
        <div class="px-2 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-2">
          <dt class="text-sm font-semibold leading-6 text-gray-900">
            Event Type
          </dt>
          <dd
            class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
          >
            {toReadableEventType(data.event.event_type)}
          </dd>
        </div>
        <div
          class="px-2 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-2 bg-slate-100"
        >
          <dt class="text-sm font-semibold leading-6 text-gray-900">
            Event ID
          </dt>
          <dd
            class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
          >
            {data.event._id}
          </dd>
        </div>
        <div class="px-2 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-2">
          <dt class="text-sm font-semibold leading-6 text-gray-900">
            System ID
          </dt>
          <dd
            class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
          >
            {data.event.system_id}
          </dd>
        </div>
        <div
          class="px-2 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-2 bg-slate-100"
        >
          <dt class="text-sm font-semibold leading-6 text-gray-900">
            Detection Time
          </dt>
          <dd
            class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
          >
            {toDateTime(data.event.detection_time)}
          </dd>
        </div>
        <div class="px-2 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-2">
          <dt class="text-sm font-semibold leading-6 text-gray-900">
            Lattitude
          </dt>
          <dd
            class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
          >
            {data.event.location.lat}
          </dd>
        </div>
        <div
          class="px-2 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-2 bg-slate-100"
        >
          <dt class="text-sm font-semibold leading-6 text-gray-900">
            Longitude
          </dt>
          <dd
            class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
          >
            {data.event.location.lng}
          </dd>
        </div>
        <div class="px-2 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-2">
          <dt class="text-sm font-semibold leading-6 text-gray-900">Image</dt>
          <dd
            class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
          >
            <!-- svelte-ignore a11y-img-redundant-alt -->
            <img
              class="max-w-md h-auto"
              src={data.event.image_data}
              alt="Event image"
            />
          </dd>
        </div>
        <div class="px-2 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-2">
          <dt class="text-sm font-semibold leading-6 text-gray-900">Video</dt>
          <dd
            class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
          >
            <!-- svelte-ignore a11y-media-has-caption -->
            <video class="max-w-md h-auto" controls>
              <source src={data.event.video_data} />
            </video>
          </dd>
        </div>
      </dl>
    </div>
  </div>
</div>
