<!-- TODO: Change Google Docs toggle into dropdown for Google Docs, Notion, and plain text -->
<script lang="ts">
	import {
		Button,
		Footer,
		Heading,
		Hr,
		Label,
		Textarea,
		Toast,
		Toggle,
		Tooltip,
		P,
		A,
		FooterIcon
	} from 'flowbite-svelte';
	import { ClipboardCheckOutline, CloseCircleOutline, GithubSolid } from 'flowbite-svelte-icons';

	let copyHtml = $state(false);
	let output: string[] = $state([]);
	let showStateButton = $state(false);
	let showStateCopy = $state(false);
	let toastStatus = $state(false);
	let value = $state('');

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

		showStateCopy = output.length > 0;
	}

	function copyToClipboard() {
		if (copyHtml) {
			let text = output
				.map((link) => `<a href="${link}" target="_blank" rel="noopener noreferrer">${link}</a>`)
				.join('<br>'); // Generate HTML links
			let type = 'text/html';
			let blob = new Blob([text], { type });
			let data = [new ClipboardItem({ [type]: blob })];

			navigator.clipboard.write(data).then(() => {
				toastStatus = true;
			});
			setTimeout(() => {
				toastStatus = false;
			}, 3000);
		} else {
			let text = output.toString();
			text = text.replaceAll(',', '\n');
			navigator.clipboard.writeText(text).then(() => {
				toastStatus = true;
			});
			setTimeout(() => {
				toastStatus = false;
			}, 3000);
		}
	}

	function checkInputLength() {
		console.log('Checking length');
		showStateButton = value.length > 0;
	}

	function handlePaste() {
		setTimeout(() => {
			value += '\n';
		}, 0);
	}
</script>

<div class="flex h-screen flex-col justify-between">
	<div>
		<Heading tag="h2" class="text-gray-100 lg:p-2" customSize="text-4xl font-extrabold "
			>Welcome to the Bestiary URL Converter!</Heading
		>
		<P class="my-4 ml-3 text-gray-300"
			>Paste multiple urls from the <A
				href="https://5e.tools/bestiary.html"
				target="_blank"
				rel="noopener noreferrer">Bestiary list</A
			> and click the button to convert them into links to individual stat blocks. <br />Please only
			copy and paste links that you know are safe.</P
		>

		<div>
			<Label for="url-textarea" class="mb-2 ml-3 text-gray-400">URLs</Label>
			<Textarea
				bind:value
				on:input={checkInputLength}
				on:paste={handlePaste}
				id="url-textarea"
				rows={4}
				name="url"
				class="ml-3 box-border w-11/12 bg-gray-700 text-gray-100 lg:w-2/5"
			/>
		</div>

		<div class="mt-2 flex">
			<div>
				<Button class="ml-3" on:click={convert} disabled={!showStateButton}>Convert</Button>
			</div>

			{#if showStateButton}
				<div>
					<Button class="ml-3" on:click={clear} disabled={!showStateButton}
						><CloseCircleOutline /></Button
					>
				</div>
			{/if}

			{#if showStateCopy}
				<div>
					<Button class="ml-3" on:click={copyToClipboard}><ClipboardCheckOutline /></Button>
					<Tooltip trigger="hover">Copy to Clipboard</Tooltip>
				</div>

				<div>
					<Toggle class="ml-3 mt-2 text-gray-300" bind:checked={copyHtml}>Copy as HTML</Toggle>
					<Tooltip trigger="hover"
						>Copy links as HTML. For use with Google Docs and other editors.</Tooltip
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
				class="w-44 rounded bg-primary-600"
			>
				<P class="text-white">Copied to Clipboard</P>
			</Toast>
		</div>
	</div>

	<div>
		<Hr hrClass="bg-gray-500 border-gray-500" />
		<Footer class="static bottom-0 p-1">
			<FooterIcon
				href="https://github.com/ScidaJ/BestiaryURLConverter"
				target="_blank"
				rel="noopener noreferrer"
			>
				<GithubSolid
					class="h-5 w-5 text-gray-500 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white"
				/>
			</FooterIcon>
		</Footer>
	</div>
</div>
