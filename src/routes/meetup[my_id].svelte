<script context="module">
  export function preload(page) {
    const id = page.params.my_id;

    return this.fetch(
      `https://meetup-meetus-default-rtdb.firebaseio.com/meetups/${id}.json`
    )
      .then((res) => {
        if (!res.ok) throw "Could not fetch meetup!";
        return res.json();
      })
      .then((data) => {
        return { meetup: { id, ...data } };
      })
      .catch((err) => {
        this.error(404, err);
      });
  }
</script>

<script>
  import Button from "../components/UI/Button.svelte";

  export let meetup;
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
    <Button type="button" mode="outline" href="/">Close</Button>
  </div>
</section>
