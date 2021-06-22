<script>
  import Modal from "./Modal.svelte";
  export let message = "teste";
</script>

<Modal title="An error occurred!" on:close>
  <p>{message}</p>
</Modal>
