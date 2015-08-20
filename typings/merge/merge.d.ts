declare var merge: {
	(...args): any;
	recursive(...args); any;
}

declare module "merge" {
	export = merge;
}
