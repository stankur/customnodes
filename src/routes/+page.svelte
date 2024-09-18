<script lang="ts">
	import Editor from '$lib/components/Editor.svelte';
	import { createNodeFromHtml, htmlSchema } from '$lib/prosemirror/HTMLSchema';
	import { getDraft, upsertDraft } from '$lib/storage/draft';
	import { exampleSetup } from 'prosemirror-example-setup';
	import { EditorState } from 'prosemirror-state';
    import { DOMParser } from 'prosemirror-model';
	import { onMount } from 'svelte';
    let content: string | null = null;
	let state: EditorState;

	async function handleStateChange(event: any) {
		state = event.detail.state;
		upsertDraft(state.doc.toJSON());
		content = state.doc.toJSON();
	}

    onMount(() => {
        const draft = getDraft();

		if (draft) {
			content = draft;
			console.log('content: ', content);

			state = EditorState.create({
				schema: htmlSchema,
				plugins: exampleSetup({ schema: htmlSchema, menuBar: false }),
				doc: htmlSchema.nodeFromJSON(content)
			});
			return;
		}

		state = EditorState.create({
			schema: htmlSchema,
			plugins: exampleSetup({ schema: htmlSchema, menuBar: false }),
			doc: DOMParser.fromSchema(htmlSchema).parse(
				createNodeFromHtml('<p>Paste your content here</p>')
			)
		});
		content = state.doc.toJSON();
		upsertDraft(state.doc.toJSON());
    });

</script>

<h1 class="font-bold text-pink-500">
    hello hello my luv, if you paste your content here, the html will be logged in the console. 
</h1>

{#if content !== null}
	<Editor {state} on:statechange={handleStateChange} />
{/if}
