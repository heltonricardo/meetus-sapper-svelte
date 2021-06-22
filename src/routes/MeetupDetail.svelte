<script>
  import { createEventDispatcher } from "svelte";
  import meetups from "../Meetups/meetups-store";
  import Button from "../UI/Button.svelte";

  const dispatch = createEventDispatcher();

  export let id;

  let meetup = $meetups.find((m) => m.id === id);
</script>

<style>
  section {
    margin-top: 4rem;
  }

  .image {
    width: 100%;
    height: 25rem;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .image {
    background: #e7e7e7;
  }

  .content {
    text-align: center;
    width: 80%;
    margin: auto;
  }

  h1 {
    font-size: 2rem;
    font-family: "Roboto Slab", sans-serif;
    margin: 0.5rem 0;
  }

  p {
    font-size: 1.5rem;
  }
</style>

<section>
  <div class="image">
    <img src={meetup.imageUrl} alt={meetup.title} />
  </div>
  <div class="content">
    <h1>{meetup.title}</h1>
    <h1>{meetup.subtitle} - {meetup.address}</h1>
    <p>{meetup.description}</p>
    <Button href="mailto:{meetup.contactEmail}">Contact</Button>
    <Button type="button" mode="outline" on:click={() => dispatch("close")}
      >Close</Button
    >
  </div>
</section>
