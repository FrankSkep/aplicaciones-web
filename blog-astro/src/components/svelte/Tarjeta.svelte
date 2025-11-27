<script>
  export let title = '';
  export let excerpt = '';
  export let date = '';
  export let href = '#';
  export let image = '';
  // When used inside an outer anchor (wrapper), set `noLink` to true
  export let noLink = false;

  const formattedDate = date
    ? new Date(date).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' })
    : '';
</script>

{#if noLink}
  <div class="tarjeta">
    {#if image}
      <div class="thumb" style="background-image: url({image});" aria-hidden="true"></div>
    {/if}
    <div class="contenido">
      <h3 class="titulo">{title}</h3>
      {#if excerpt}
        <p class="excerpt">{excerpt}</p>
      {/if}
      <time class="fecha">{formattedDate}</time>
    </div>
  </div>
{:else}
  <!-- <a class="tarjeta" href={href}> -->
    {#if image}
      <div class="thumb" style="background-image: url({image});" aria-hidden="true"></div>
    {/if}
    <div class="contenido">
      <h3 class="titulo">{title}</h3>
      {#if excerpt}
        <p class="excerpt">{excerpt}</p>
      {/if}
      <time class="fecha">{formattedDate}</time>
    </div>
  <!-- </a> -->
{/if}

<style>
  .tarjeta {
    display: flex;
    gap: 1rem;
    align-items: stretch;
    background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
    border-radius: 12px;
    padding: .8rem;
    text-decoration: none;
    color: inherit;
    border: 1px solid rgba(255,255,255,0.03);
    transition: transform .12s ease, box-shadow .12s ease;
  }

  .tarjeta:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(2,6,23,0.5);
  }

  .thumb {
    width: 110px;
    min-width: 110px;
    height: 80px;
    background-size: cover;
    background-position: center;
    border-radius: 8px;
    flex-shrink: 0;
    background-color: rgba(255,255,255,0.03);
  }

  .contenido { flex: 1; display:flex; flex-direction:column; justify-content:space-between; }

  .titulo {
    margin: 0 0 .35rem 0;
    font-size: 1.05rem;
    color: #e6eef8;
  }

  .excerpt { margin: 0; color: #cbd5e1; font-size: .95rem; }

  .fecha { color: #9fb0c8; font-size: .82rem; margin-top: .6rem; }

  @media (max-width:600px) {
    .tarjeta { flex-direction: row; }
    .thumb { width: 84px; height: 60px; }
  }
</style>
