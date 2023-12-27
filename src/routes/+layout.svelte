<script>
    import '../app.scss';
</script>

<div class="container d-flex justify-content-center align-items-center">
    <div class="card">
        <slot />
    </div>
</div>

<style>
    .card {
        width: 600px;
        max-width: 600px;
        margin: 32px;
    }

    .container {
        min-height: 100vh;
    }
</style>
