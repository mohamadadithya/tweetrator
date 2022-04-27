<script>
	import { hasOpen, date, time } from '../stores/modalStore';

	let dateValue, timeValue;

	const selectDate = () => {
		hasOpen.set(false);

		if (dateValue) {
			date.set(dateValue);
		}
		if (timeValue) {
			time.set(timeValue);
		}
	};
</script>

<div
	class="fixed z-20 transition-all duration-300 ease-in-out max-w-full {$hasOpen
		? 'translate-y-0 opacity-1'
		: '-translate-y-full opacity-0'} bg-white p-4 rounded-md top-3 left-2/4 right-2/4 -translate-x-1/2 w-96 shadow-md"
>
	<h1 class="font-bold text-2xl mb-4">Select Date</h1>
	<form>
		<div class="mb-3">
			<label for="date">Date</label>
			<input
				class="block w-full mt-3 border-2 border-cyan-600 outline-none p-3 rounded-md"
				type="date"
				name="date"
				id="date"
				bind:value={dateValue}
			/>
		</div>
		<div class="mb-3">
			<label for="time">Time</label>
			<input
				class="block w-full my-3 border-2 border-cyan-600 outline-none p-3 rounded-md"
				type="time"
				name="time"
				id="time"
				bind:value={timeValue}
			/>
		</div>
		<button type="button" on:click={selectDate} class="px-4 py-2 bg-cyan-600 rounded-md text-white"
			>Done</button
		>
	</form>
</div>
