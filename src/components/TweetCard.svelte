<script>
	import Modal from './Modal.svelte';
	import { hasOpen, date, time } from '../stores/modalStore';
	import * as htmlToImage from 'html-to-image';
	import { Notyf } from 'notyf';
	import 'notyf/notyf.min.css';
	import { numFormatter } from '../helper/numFormatter';

	export let theme = 'light';

	let photoSrc = '/img/default.png',
		classes = 'bg-white text-black',
		iconsColor = '#0ea5e9',
		dropupOpened = false,
		imageSrc = '',
		factChecked = false,
		verifiedBadge = false,
		tweetCardEl,
		retweets = '0',
		quoteTweets = '0',
		likes = '0',
		hasDownloaded = false;

	const selectedPhoto = (e) => {
		let photo = e.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(photo);
		reader.onload = (e) => {
			// @ts-ignore
			photoSrc = e.target.result;
		};
	};

	const selectedImage = (e) => {
		let image = e.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e) => {
			// @ts-ignore
			imageSrc = e.target.result;
		};
	};

	$: if (theme === 'light') {
		classes = 'bg-white text-black border-gray-200';
		iconsColor = '#0ea5e9';
	} else if (theme === 'dim') {
		classes = 'bg-dim text-white border-gray-500';
		iconsColor = '#fff';
	} else {
		classes = 'bg-black text-white border-gray-500';
		iconsColor = '#fff';
	}

	const generateToImage = () => {
		hasDownloaded = true;
		htmlToImage
			.toJpeg(tweetCardEl, { pixelRatio: 1.5 })
			.then((dataUrl) => {
				let link = document.createElement('a');
				link.download = 'tweetrator-tweet.jpeg';
				link.href = dataUrl;
				link.click();
				hasDownloaded = false;
			}).catch((err) => {
				console.error(err);
			})
			.finally(() => {
				const notyf = new Notyf({
					duration: 2000,
					position: {
						x: 'right',
						y: 'bottom'
					},
					types: [
						{
							type: 'success',
							background: '#0891b2'
						}
					],
					dismissible: true
				});
				notyf.success("Tweet's image has been downloaded.");
			});
	};

	const randomizeActionCount = () => {
		retweets = numFormatter(Math.floor(Math.random() * 100000) + 130);
		quoteTweets = numFormatter(Math.floor(Math.random() * 100000) + 130);
		likes = numFormatter(Math.floor(Math.random() * 100000) + 130);
	};
</script>

<div
	class={`p-4 ${!hasDownloaded ? 'border-2' : ''} aspect-[1/1] md:aspect-[16/8] ${classes} font-inter`}
	id="tweet-card"
	bind:this={tweetCardEl}
>
	<!-- svelte-ignore a11y-img-redundant-alt -->
	<div class="flex justify-between mb-5">
		<div class="flex items-center">
			<label for="photo-input">
				<img
					src={photoSrc}
					class={`rounded-full w-12 h-12 ${
						!hasDownloaded ? 'border-2 border-dashed p-0.5' : ''
					} cursor-pointer`}
					alt="User's photo"
				/>
				<input
					type="file"
					class="hidden"
					name="photo-input"
					id="photo-input"
					on:change={(e) => selectedPhoto(e)}
				/>
			</label>
			<div class="flex-column ml-3">
				<div class="flex items-center text-base">
					<p
						class={`font-bold ${!hasDownloaded ? 'border-2 border-dashed' : ''} outline-none`}
						contenteditable="true"
						spellcheck="false"
					>
						Name
					</p>
					{#if verifiedBadge}
						<svg fill={iconsColor} width="22" viewBox="0 0 24 24"
							><g
								><path
									d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z"
								/></g
							></svg
						>
					{/if}
				</div>
				<p class="text-gray-500">
					@<span
						class={`${!hasDownloaded ? 'border-2 border-dashed' : ''} outline-none`}
						contenteditable="true"
						spellcheck="false">username</span
					>
				</p>
			</div>
		</div>
		<div class="relative">
			<button
				class={`text-xl text-gray-500 self-start ${
					!hasDownloaded ? 'border-2 border-dashed' : ''
				} border-gray-300`}
				on:click={() => (dropupOpened = !dropupOpened)}
			>
				<svg viewBox="0 0 24 24" fill="#9ca3af" width="22"
					><g
						><circle cx="5" cy="12" r="2" /><circle cx="12" cy="12" r="2" /><circle
							cx="19"
							cy="12"
							r="2"
						/></g
					></svg
				>
			</button>
			<ul
				class={`absolute top-12 bg-white shadow-xl text-sm md:text-base transition-all duration-300 ease-linear text-black ${
					dropupOpened
						? 'opacity-full pointer-events-auto translate-y-0'
						: 'opacity-0 pointer-events-none translate-y-10'
				} left-0 -translate-x-36 rounded-xl w-48`}
				id="dropup-menu"
			>
				<li>
					<button class="px-3 py-2.5 hover:bg-gray-200 rounded-t-xl w-full text-left" type="button" on:click={() => (verifiedBadge = !verifiedBadge)}
						>Verified badge</button
					>
				</li>
				<li>
					<label for="image-input" class="cursor-pointer px-3 py-2.5 hover:bg-gray-200 block w-full">Add image</label>
					<input
						type="file"
						class="hidden"
						name="image-input"
						id="image-input"
						on:change={(e) => selectedImage(e)}
					/>
				</li>
				<li>
					<button type="button" class="px-3 py-2.5 hover:bg-gray-200 rounded-b-xl block w-full text-left" on:click={() => (factChecked = !factChecked)}
						>Fact check warning</button
					>
				</li>
			</ul>
		</div>
	</div>
	<p
		class={`text-xl mb-3 ${!hasDownloaded ? 'border-2 border-dashed' : ''} outline-none`}
		contenteditable="true"
		spellcheck="false"
	>
		Your tweet here.
	</p>
	{#if factChecked}
		<div id="debunk" class="flex items-center pb-1.5 border-b border-inherit">
			<svg fill="#0ea5e9" width="26" viewBox="0 0 24 24"
				><g
					><circle cx="12.025" cy="16.437" r="1.281" /><path
						d="M14.39 7.194c-.094-.127-.242-.2-.4-.2h-3.928c-.158 0-.307.073-.4.2-.096.126-.125.29-.08.442l1.814 6.098c.063.212.258.357.48.357h.298c.222 0 .416-.145.48-.356l1.813-6.098c.047-.152.017-.316-.077-.442z"
					/><path
						d="M12 22.75C6.072 22.75 1.25 17.928 1.25 12S6.072 1.25 12 1.25 22.75 6.072 22.75 12 17.928 22.75 12 22.75zm0-20C6.9 2.75 2.75 6.9 2.75 12S6.9 21.25 12 21.25s9.25-4.15 9.25-9.25S17.1 2.75 12 2.75z"
					/></g
				></svg
			>
			<p
				class={`text-cyan-600 text-sm ml-2 ${
					!hasDownloaded ? 'border-2 border-dashed' : ''
				} outline-none`}
				contenteditable="true"
			>
				This fact is disputed
			</p>
		</div>
	{/if}
	<!-- svelte-ignore a11y-img-redundant-alt -->
	{#if imageSrc}
		<label for="image-input" class="cursor-pointer">
			<img
				class={`rounded-2xl ${
					!hasDownloaded ? 'border-2 border-dashed' : ''
				} p-1 border-inherit mb-4 w-full`}
				src={imageSrc}
				alt="User's image"
				on:click={(e) => selectedImage(e)}
			/>
		</label>
	{/if}
	<p class={`text-gray-500 py-3 text-xs md:text-base border-b border-inherit`}>
		<span
			class={`cursor-pointer ${!hasDownloaded ? 'border-2 border-dashed' : ''}`}
			on:click={() => hasOpen.set(true)}
			>{new Date(`${$date} ${$time}`).toLocaleTimeString('en-us', {
				hour12: true,
				hour: '2-digit',
				minute: '2-digit'
			})} · {new Date($date).toLocaleDateString('en-us', {
				day: '2-digit',
				month: 'long',
				year: 'numeric'
			})}</span
		>
		· Twitter
		<span
			class={`${!hasDownloaded ? 'border-2 border-dashed' : ''} outline-none`}
			contenteditable="true"
			spellcheck="false">for Android</span
		>
	</p>
	<Modal />
	<div class={`py-4 border-b border-inherit text-xs md:text-base`} id="stats">
		<ul class="flex">
			<li class="mr-4 text-gray-500">
				<span
					class={`font-bold mr-1 outline-none text-${theme === 'light' ? 'black' : 'white'} ${
						!hasDownloaded ? 'border-2 border-dashed' : ''
					}`}
					contenteditable="true"
					spellcheck="false">{retweets}</span
				> Retweets
			</li>
			<li class="mr-4 text-gray-500">
				<span
					class={`font-bold mr-1 outline-none text-${theme === 'light' ? 'black' : 'white'} ${
						!hasDownloaded ? 'border-2 border-dashed' : ''
					}`}
					contenteditable="true"
					spellcheck="false">{quoteTweets}</span
				> Quote Tweets
			</li>
			<li class="text-gray-500">
				<span
					class={`font-bold mr-1 outline-none text-${theme === 'light' ? 'black' : 'white'} ${
						!hasDownloaded ? 'border-2 border-dashed' : ''
					}`}
					contenteditable="true"
					spellcheck="false">{likes}</span
				> Likes
			</li>
		</ul>
		<!-- svelte-ignore a11y-missing-attribute -->
		{#if !hasDownloaded}
			<a
				role="button"
				class="text-sm mt-4 inline-block text-cyan-600"
				on:click={randomizeActionCount}>Randomize all <i class="fas fa-fw fa-random" /></a
			>
		{/if}
	</div>
	<ul class={`flex justify-around py-3 border-b border-inherit`} id="actions">
		<li>
			<svg class="w-6" fill="#5b7083" viewBox="0 0 24 24"
				><g
					><path
						d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"
					/></g
				></svg
			>
		</li>
		<li>
			<svg class="w-6" fill="#5b7083" viewBox="0 0 24 24"
				><g
					><path
						d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"
					/></g
				></svg
			>
		</li>
		<li>
			<svg class="w-6" fill="#5b7083" viewBox="0 0 24 24"
				><g
					><path
						d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"
					/></g
				></svg
			>
		</li>
		<li>
			<svg class="w-6" fill="#5b7083" viewBox="0 0 24 24"
				><g
					><path
						d="M17.53 7.47l-5-5c-.293-.293-.768-.293-1.06 0l-5 5c-.294.293-.294.768 0 1.06s.767.294 1.06 0l3.72-3.72V15c0 .414.336.75.75.75s.75-.336.75-.75V4.81l3.72 3.72c.146.147.338.22.53.22s.384-.072.53-.22c.293-.293.293-.767 0-1.06z"
					/><path
						d="M19.708 21.944H4.292C3.028 21.944 2 20.916 2 19.652V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 .437.355.792.792.792h15.416c.437 0 .792-.355.792-.792V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 1.264-1.028 2.292-2.292 2.292z"
					/></g
				></svg
			>
		</li>
	</ul>
</div>
<button
	class="text-white mt-4 bg-cyan-600 hover:bg-cyan-800 px-5 py-2 rounded-full font-bold"
	on:click={generateToImage}
>
	<i class="far fa-download mr-3" />
	Generate to image
</button>
