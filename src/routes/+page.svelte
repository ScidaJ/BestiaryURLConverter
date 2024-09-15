<script lang="ts">
    import { Button, Heading, Label, Textarea, Tooltip, P, A } from 'flowbite-svelte';
    import { ClipboardCheckOutline } from 'flowbite-svelte-icons';

    let value = '';
    let output: string[] = [];
    let showStateCopy = false;
    let showStateConvert = false;

    function convert() {
        output = []
        
        let urls = value.split(/\r\n|\r|\n/)
        urls.forEach(url => {
            url = url.replace("bestiary.html#", "bestiary/")
            url = url.replaceAll("%20", "-")
            url = url.replaceAll("_", "-")
            output = [...output, url.concat(".html")]
        });

        if (urls.length > 0) {
            showStateCopy = true;
        } else {
            showStateCopy = false;
        }
    }

    function copyToClipboard() {
        let text = output.toString()
        text = text.replaceAll(",", "\n")
        navigator.clipboard.writeText(text)
    }

    function checkInputLength() {
        if (value.length > 0) {
            showStateConvert = true;
        } else {
            showStateConvert = false;
        }
    }
</script>
  
<div>
    <Heading tag="h2" style="margin: 10px;" customSize="text-4xl font-extrabold ">Welcome to the Bestiary URL Converter!</Heading>
    <P style="margin: 10px;" class="my-4">Paste any urls from the <A href="https://5e.tools/bestiary.html" target="_blank" rel="noopener noreferrer">Bestiary list</A> and click the button to convert them into links to individual stat blocks.</P>

    <div>
        <Label for="url-textarea" style="margin-left: 10px; margin-bottom: 4px; color:grey" class="mb-2">URLs</Label>
        <Textarea bind:value={value} on:input={checkInputLength} id="url-textarea" rows="4" style="width: 40%; margin-left: 10px" name="url" />
    </div>

    <div style="display: flex;">
        <div>
            <Button style="margin: 10px;" on:click={convert} disabled={!showStateConvert}>Convert</Button>
        </div>

        {#if showStateCopy}
            <div>
                <Button style="margin: 10px;" id="copy-button" on:click={copyToClipboard}><ClipboardCheckOutline /></Button>
                <Tooltip triggeredBy="#copy-button">Copy to Clipboard</Tooltip>
            </div>
        {/if}
    </div>

    <div>
        {#each output as url}
            <A href="{url}" target="_blank" rel="noopener noreferrer" style="display: block; margin-bottom: 10px; margin-left: 10px;">{url}</A>
        {/each}
    </div>
</div>

