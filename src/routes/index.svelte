<script context="module">
  export function preload(page) {
    return this.fetch(
      "https://meetup-meetus-default-rtdb.firebaseio.com/meetups.json"
    )
      .then((res) => {
        if (!res.ok) {
          throw "Fetching meetups failed, please try again later!";
        }
        return res.json();
      })
      .then((data) => {
        const loadedMeetups = [];
        for (const d in data) {
          loadedMeetups.push({ id: d, ...data[d] });
        }
        return { fetchedMeetups: loadedMeetups.reverse() };
      })
      .catch((err) => {
        this.error(500, "Could not fetch meetups :(");
      });
  }
</script>

<script>
  import { flip } from "svelte/animate";
  import { scale } from "svelte/transition";
  import { onDestroy, onMount } from "svelte";

  import meetups from "../meetups-store";
  import Button from "../components/UI/Button.svelte";
  import MeetupItem from "../components/Meetup/MeetupItem.svelte";
  import MeetupFilter from "../components/Meetup/MeetupFilter.svelte";
  import EditMeetup from "../components/Meetup/EditMeetup.svelte";
  import LoadingSpinner from "../components/UI/LoadingSpinner.svelte";

  export let fetchedMeetups;

  let unsubs;
  let editMode;
  let editedId;
  let isLoading;
  let loadedMeetups = [];
  let favsOnly = false;

  $: filteredMeetups = favsOnly
    ? loadedMeetups.filter((m) => m.isFavorite)
    : loadedMeetups;

  onMount(() => {
    unsubs = meetups.subscribe((items) => {
      loadedMeetups = items;
    });
    meetups.setMeetups(fetchedMeetups);
  });

  onDestroy(() => {
    if (unsubs) {
      unsubs();
    }
  });

  function setFilter(event) {
    favsOnly = event.detail;
  }

  function closeEditMode() {
    editMode = false;
    editedId = false;
  }

  function startEdit(event) {
    editMode = true;
    editedId = event.detail;
  }

  function startAdd() {
    editMode = true;
  }
</script>

<style>
  #meetups {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }

  #meetup-controls {
    margin: 1rem;
    display: flex;
    justify-content: space-between;
  }

  @media (min-width: 768px) {
    #meetups {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  #no-meetups {
    margin: 1rem;
    text-align: center;
  }
</style>

<svelte:head>
  <title>All Meetups</title>
</svelte:head>

{#if editMode}
  <EditMeetup id={editedId} on:close={closeEditMode} />
{/if}

{#if isLoading}
  <LoadingSpinner />
{:else}
  <section id="meetup-controls">
    <MeetupFilter on:favsOnly={setFilter} />
    <Button on:click={startAdd}>New Meetup</Button>
  </section>

  {#if filteredMeetups.length}
    <section id="meetups">
      {#each filteredMeetups as meetup (meetup.id)}
        <div transition:scale animate:flip={{ duration: 400 }}>
          <MeetupItem
            {meetup}
            on:edit={startEdit}
          />
        </div>
      {/each}
    </section>
  {:else}
    <p id="no-meetups">No meetups found, you can start adding some.</p>
  {/if}
{/if}
