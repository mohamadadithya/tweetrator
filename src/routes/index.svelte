<script>
	import Container from '../components/Container.svelte';
	import { MetaTags } from 'svelte-meta-tags';
	import TweetCard from '../components/TweetCard.svelte';

	const themes = ['light', 'dim', 'dark'];
	const fonts = ['montserrat', 'inter', 'poppins'];

	let selectedTheme = 'light',
		selectedFont = 'inter';
</script>

<MetaTags
	title="Tweetrator"
	description="A generator website to create a fake tweets."
	additionalMetaTags={[
		{
			property: 'dc:creator',
			content: 'Mohamad Adithya'
		},
		{
			name: 'application-name',
			content: 'Tweetrator'
		},
		{
			httpEquiv: 'x-ua-compatible',
			content: 'IE=edge; chrome=1'
		}
	]}
/>

<section class="pt-24 md:pt-36 py-10">
	<Container classes="grid md:grid-cols-2">
		<div>
			<h1 class="text-3xl font-bold mb-5">Configuration</h1>
			<form class="mb-6">
				<p class="mb-3 font-bold">Theme</p>
				<div class="mb-5 accent-cyan-600">
					{#each themes as theme}
						<label for={theme} class="mr-4 capitalize">
							<input
								type="radio"
								class="mr-2"
								name="theme"
								id={theme}
								value={theme}
								bind:group={selectedTheme}
							/>
							{theme}
						</label>
					{/each}
				</div>
				<p class="mb-3 font-bold">Font Style</p>
				<div class="mb-3 accent-cyan-600">
					{#each fonts as font}
						<label class="mr-4 capitalize" for={font}>
							<input
								type="radio"
								class="mr-2"
								name="font-style"
								id={font}
								value={font}
								bind:group={selectedFont}
							/>
							{font}
						</label>
					{/each}
				</div>
			</form>
			<button class="text-white bg-cyan-600 hover:bg-cyan-800 px-5 py-2 rounded-lg font-bold">
				<i class="far fa-download mr-3" />
				Generate image
			</button>
		</div>
		<div class="mt-10 md:mt-0">
			<h2 class="text-3xl font-bold mb-5">Preview</h2>
			<TweetCard fontFamily={selectedFont} theme={selectedTheme} />
		</div>
	</Container>
</section>
