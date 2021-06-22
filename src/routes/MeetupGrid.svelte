<script>
  import { flip } from "svelte/animate";
  import { scale } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  import Button from "../UI/Button.svelte";
  import MeetupItem from "./MeetupItem.svelte";
  import MeetupFilter from "./MeetupFilter.svelte";

  const dispatch = createEventDispatcher();

  export let meetups;

  let favsOnly = false;

  $: filteredMeetups = favsOnly ? meetups.filter((m) => m.isFavorite) : meetups;

  function setFilter(event) {
    favsOnly = event.detail;
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

{#if editMode}
  <EditMeetup id={editedId} on:close={closeEditMode} />
{/if}

{#if isLoading}
  <LoadingSpinner />
{:else}
  <MeetupGrid
    meetups={$meetups}
    on:edit={startEdit}
    on:showdetails={showDetails}
    on:add={() => (editMode = true)}
  />
{/if}

<section id="meetup-controls">
  <MeetupFilter on:favsOnly={setFilter} />
  <Button on:click={() => dispatch("add")}>New Meetup</Button>
</section>

{#if filteredMeetups.length}
  <section id="meetups">
    {#each filteredMeetups as meetup (meetup.id)}
      <div transition:scale animate:flip={{ duration: 400 }}>
        <MeetupItem {meetup} on:toggleFavorite on:showdetails on:edit />
      </div>
    {/each}
  </section>
{:else}
  <p id="no-meetups">No meetups found, you can start adding some.</p>
{/if}
