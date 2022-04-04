<script>
	import Header from '../components/Header.svelte';
	import '../../static/css/tailwind.css';
</script>

<svelte:head>
	<link href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" rel="stylesheet" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Montserrat:wght@400;700&family=Poppins:wght@400;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<main class="font-montserrat">
	<Header />
	<slot />
</main>
