<script lang="ts">
    import { Button, Heading, Textarea, Label, P, A } from 'flowbite-svelte';

    let input = "";
    let output: string[] = [];

    function convert() {
        output = []
        
        console.log(input)
        let urls = input.split(/\r\n|\r|\n/)
        console.log(urls)
        urls.forEach(url => {
            url = url.replace("bestiary.html#", "bestiary/")
            url = url.replaceAll("%20", "-")
            url = url.replaceAll("_", "-")
            output = [...output, url.concat(".html")]
        });
    }
</script>
  
<div>
    <Heading tag="h2" style="margin: 10px;" customSize="text-4xl font-extrabold ">Welcome to the Bestiary URL Converter!</Heading>
    <P style="margin: 10px;" class="my-4">Paste any urls from the Bestiary list and click the button to convert them into links to individual stat blocks.</P>

    <div>
        <Label for="url-textarea" style="margin-left: 10px; margin-bottom: 4px; color:grey" class="mb-2">URLs</Label>
        <Textarea id="url-textarea" rows="4" style="width: 40%; margin-left: 10px" name="url" bind:value={input} />
    </div>
    <Button style="margin: 10px;" on:click={convert}>Convert</Button>

    <div>
        {#each output as url}
            <A href="{url}" target="_blank" rel="noopener noreferrer" style="display: block; margin-bottom: 10px; margin-left: 10px;">{url}</A>
        {/each}
    </div>
</div>

