export function upsertDraft(draft: JSON) {
	localStorage.setItem('draft', JSON.stringify(draft));
}

export function getDraft(): string |  null {
    const draft = localStorage.getItem('draft');
    console.log(draft);
    return draft ? JSON.parse(draft) : null;
}
