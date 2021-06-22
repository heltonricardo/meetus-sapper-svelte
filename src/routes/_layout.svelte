<script>
  import Header from "../components/UI/Header.svelte";
</script>

<style>
  main {
    margin-top: 5rem;
  }
  #warning {
    text-align: center;
    margin: 3rem auto;
  }
</style>

<Header />

<main>
  <slot />
</main>

<p id="warning">
  ⚠️ Data from this page is dynamically entered by users. The author of this
  project assumes no responsibility for this content. ⚠️
</p>
