<script>
	import Container from '../components/Container.svelte';
	import { MetaTags } from 'svelte-meta-tags';
	import TweetCard from '../components/TweetCard.svelte';

	const themes = ['light', 'dim', 'dark'];
	let selectedTheme = 'light';
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

<section class="pt-24 md:pt-36 pb-8">
	<Container classes="grid lg:grid-cols-2 gap-6 lg:gap-8">
		<div>
			<h1 class="text-3xl font-bold mb-5">How to Use</h1>
			<ul class="list-disc list-inside mb-6">
				<li class="mb-2">
					Everything inside a <span class="border-2 border-dashed">dashed border</span> is editable.
					Click on one to edit it.
				</li>
				<li>
					Clicking on a Tweet's <i class="far fa-fw fa-ellipsis-h border-2 border-dashed" /> icon will
					bring up additional options, such as adding an image and toggling the verified badge.
				</li>
			</ul>
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
			</form>
		</div>
		<div>
			<h2 class="text-3xl font-bold mb-5">Preview</h2>
			<TweetCard theme={selectedTheme} />
		</div>
	</Container>
	<footer class="mt-16">
		<Container>
			<p class="text-sm">
				&copy; 2022 Tweetrator | <a
					class="font-bold"
					href="https://m-adithya.my.id"
					aria-label="Author">Mohamad Adithya</a
				>
			</p>
		</Container>
	</footer>
</section>
