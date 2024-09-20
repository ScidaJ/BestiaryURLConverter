<script lang="ts">
	import { Button, Heading, Label, Textarea, Toast, Toggle, Tooltip, P, A } from 'flowbite-svelte';
	import { ClipboardCheckOutline } from 'flowbite-svelte-icons';

	let copyHtml = false;
	let output: string[] = [];
	let showStateButton = false;
	let showStateCopy = false;
	let toastStatus = false;
	let value = '';

	function clear() {
		if (value != '') {
			value = '';
			output = [];
			showStateButton = false;
			showStateCopy = false;
		}
	}

	function convert() {
		output = [];

		let urls = value.split(/\r\n|\r|\n/);
		urls.forEach((url) => {
			if (!url.includes('https://5e.tools/bestiary')) {
				return;
			}
			url = url.replace('bestiary.html#', 'bestiary/');
			url = url.replaceAll('%20', '-');
			url = url.replaceAll('_', '-');
			url = url.concat('.html');

			output = [...output, url];
		});

		if (output.length > 0) {
			showStateCopy = true;
		} else {
			showStateCopy = false;
		}
	}

	function copyToClipboard() {
		if (copyHtml) {
			let text = output
				.map((link) => `<a href="${link}" target="_blank" rel="noopener noreferrer">${link}</a>`)
				.join('<br>'); // Generate HTML links
			let type = 'text/html';
			let blob = new Blob([text], { type });
			let data = [new ClipboardItem({ [type]: blob })];

			navigator.clipboard
				.write(data)
				.then(() => {
					console.log('Links copied as HTML');
				})
				.catch((err) => {
					console.error('Error copying to clipboard: ', err);
				});
			toastStatus = true;
			setTimeout(() => {
				toastStatus = false;
			}, 3000);
		} else {
			let text = output.toString();
			navigator.clipboard.writeText(text);
		}
	}

	function checkInputLength() {
		if (value.length > 0) {
			showStateButton = true;
		} else {
			showStateButton = false;
		}
	}
</script>

<div>
	<Heading tag="h2" class="m-2 text-gray-100" customSize="text-4xl font-extrabold "
		>Welcome to the Bestiary URL Converter!</Heading
	>
	<P class="my-4 ml-3 text-gray-300"
		>Paste multiple urls from the <A
			href="https://5e.tools/bestiary.html"
			target="_blank"
			rel="noopener noreferrer">Bestiary list</A
		> and click the button to convert them into links to individual stat blocks. Please only copy and
		paste links that you know are safe.</P
	>

	<div>
		<Label for="url-textarea" class="mb-2 ml-3 text-gray-400">URLs</Label>
		<Textarea
			bind:value
			on:input={checkInputLength}
			id="url-textarea"
			rows="4"
			name="url"
			class="ml-3 w-2/5 bg-gray-700 text-gray-100"
		/>
	</div>

	<div class="mt-2 flex">
		<div>
			<Button class="ml-3" on:click={convert} disabled={!showStateButton}>Convert</Button>
		</div>

		<div>
			<Button class="ml-3" on:click={clear} disabled={!showStateButton}>Clear Text</Button>
		</div>

		{#if showStateCopy}
			<div>
				<Button class="ml-3" on:click={copyToClipboard}><ClipboardCheckOutline /></Button>
				<Tooltip trigger="hover">Copy to Clipboard</Tooltip>
			</div>

			<div>
				<Toggle class="ml-3 mt-2 text-gray-300" bind:checked={copyHtml}>Copy as HTML</Toggle>
				<Tooltip trigger="hover"
					>Copy links as HTML links. For use with Google Docs and other editors.</Tooltip
				>
			</div>
		{/if}
	</div>

	<div class="mt-1 inline-grid">
		{#each output as url}
			<A href={url} target="_blank" rel="noopener noreferrer" class="mb-2 ml-3 inline-block"
				>{url}</A
			>
		{/each}
	</div>

	<div>
		<Toast
			dismissable={false}
			bind:toastStatus
			position="bottom-left"
			class="rounded bg-primary-600"
		>
			<P class="text-white">Copied to Clipboard</P>
		</Toast>
	</div>
</div>
