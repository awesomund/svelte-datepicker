import './Popover.css.proxy.js';
/* src/components/Popover.svelte generated by Svelte v3.30.0 */
import {
	SvelteComponent,
	add_render_callback,
	append,
	attr,
	binding_callbacks,
	component_subscribe,
	create_slot,
	detach,
	element,
	init,
	insert,
	listen,
	run_all,
	safe_not_equal,
	set_style,
	space,
	toggle_class,
	transition_in,
	transition_out,
	update_slot
} from "../../web_modules/svelte/internal.js";

import { onMount, createEventDispatcher, getContext } from "../../web_modules/svelte.js";
import { contextKey } from "./lib/context.js";
import { getTranslate } from "./lib/positioning.js";
import { once } from "./lib/event-handling.js";
const get_contents_slot_changes = dirty => ({});
const get_contents_slot_context = ctx => ({});
const get_trigger_slot_changes = dirty => ({});
const get_trigger_slot_context = ctx => ({});

function create_fragment(ctx) {
	let div4;
	let div0;
	let t;
	let div3;
	let div2;
	let div1;
	let current;
	let mounted;
	let dispose;
	add_render_callback(/*onwindowresize*/ ctx[16]);
	const trigger_slot_template = /*#slots*/ ctx[15].trigger;
	const trigger_slot = create_slot(trigger_slot_template, ctx, /*$$scope*/ ctx[14], get_trigger_slot_context);
	const contents_slot_template = /*#slots*/ ctx[15].contents;
	const contents_slot = create_slot(contents_slot_template, ctx, /*$$scope*/ ctx[14], get_contents_slot_context);

	return {
		c() {
			div4 = element("div");
			div0 = element("div");
			if (trigger_slot) trigger_slot.c();
			t = space();
			div3 = element("div");
			div2 = element("div");
			div1 = element("div");
			if (contents_slot) contents_slot.c();
			attr(div0, "class", "trigger");
			attr(div1, "class", "contents-inner svelte-1pqwr6f");
			attr(div2, "class", "wrapper svelte-1pqwr6f");
			attr(div3, "class", "contents-wrapper svelte-1pqwr6f");
			set_style(div3, "transform", "translate(-50%,-50%) translate(" + /*translateX*/ ctx[6] + "px, " + /*translateY*/ ctx[5] + "px)");
			toggle_class(div3, "visible", /*$isOpen*/ ctx[7]);
			toggle_class(div3, "shrink", /*$isClosing*/ ctx[8]);
			attr(div4, "class", "sc-popover svelte-1pqwr6f");
		},
		m(target, anchor) {
			insert(target, div4, anchor);
			append(div4, div0);

			if (trigger_slot) {
				trigger_slot.m(div0, null);
			}

			/*div0_binding*/ ctx[17](div0);
			append(div4, t);
			append(div4, div3);
			append(div3, div2);
			append(div2, div1);

			if (contents_slot) {
				contents_slot.m(div1, null);
			}

			/*div2_binding*/ ctx[18](div2);
			/*div3_binding*/ ctx[19](div3);
			/*div4_binding*/ ctx[20](div4);
			current = true;

			if (!mounted) {
				dispose = [
					listen(window, "resize", /*onwindowresize*/ ctx[16]),
					listen(div0, "click", /*doOpen*/ ctx[11])
				];

				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (trigger_slot) {
				if (trigger_slot.p && dirty & /*$$scope*/ 16384) {
					update_slot(trigger_slot, trigger_slot_template, ctx, /*$$scope*/ ctx[14], dirty, get_trigger_slot_changes, get_trigger_slot_context);
				}
			}

			if (contents_slot) {
				if (contents_slot.p && dirty & /*$$scope*/ 16384) {
					update_slot(contents_slot, contents_slot_template, ctx, /*$$scope*/ ctx[14], dirty, get_contents_slot_changes, get_contents_slot_context);
				}
			}

			if (!current || dirty & /*translateX, translateY*/ 96) {
				set_style(div3, "transform", "translate(-50%,-50%) translate(" + /*translateX*/ ctx[6] + "px, " + /*translateY*/ ctx[5] + "px)");
			}

			if (dirty & /*$isOpen*/ 128) {
				toggle_class(div3, "visible", /*$isOpen*/ ctx[7]);
			}

			if (dirty & /*$isClosing*/ 256) {
				toggle_class(div3, "shrink", /*$isClosing*/ ctx[8]);
			}
		},
		i(local) {
			if (current) return;
			transition_in(trigger_slot, local);
			transition_in(contents_slot, local);
			current = true;
		},
		o(local) {
			transition_out(trigger_slot, local);
			transition_out(contents_slot, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div4);
			if (trigger_slot) trigger_slot.d(detaching);
			/*div0_binding*/ ctx[17](null);
			if (contents_slot) contents_slot.d(detaching);
			/*div2_binding*/ ctx[18](null);
			/*div3_binding*/ ctx[19](null);
			/*div4_binding*/ ctx[20](null);
			mounted = false;
			run_all(dispose);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let $isOpen;
	let $isClosing;
	let { $$slots: slots = {}, $$scope } = $$props;
	const { isOpen, isClosing, config, resetChoices } = getContext(contextKey);
	component_subscribe($$self, isOpen, value => $$invalidate(7, $isOpen = value));
	component_subscribe($$self, isClosing, value => $$invalidate(8, $isClosing = value));
	const dispatch = createEventDispatcher();
	let popover;
	let w;
	let triggerContainer;
	let contentsAnimated;
	let contentsWrapper;
	let translateY = 0;
	let translateX = 0;
	let { trigger } = $$props;

	const close = () => {
		isClosing.set(true);

		once(contentsAnimated, "animationend", () => {
			isClosing.set(false);
			isOpen.set(false);
			dispatch("closed");
		});
	};

	function checkForFocusLoss(evt) {
		if (!$isOpen) return;
		let el = evt.target;

		do {
			if (el === popover) {
				return;
			}

			el = el.parentNode;
		} while (el);

		close();
	}

	onMount(() => {
		config.closeOnFocusLoss && document.addEventListener("click", checkForFocusLoss);

		if (!trigger) {
			return;
		}

		triggerContainer.appendChild(trigger.parentNode.removeChild(trigger));

		return () => {
			config.closeOnFocusLoss && document.removeEventListener("click", checkForFocusLoss);
		};
	});

	const doOpen = async () => {
		if (!$isOpen) {
			isOpen.set(true);
		}

		resetChoices();
		const { x, y } = await getTranslate(w, contentsWrapper, translateX, translateY);
		$$invalidate(5, translateY = y);
		$$invalidate(6, translateX = x);
		isOpen.set(true);
		dispatch("opened");
	};

	function onwindowresize() {
		$$invalidate(1, w = window.innerWidth)
	}

	function div0_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			triggerContainer = $$value;
			$$invalidate(2, triggerContainer);
		});
	}

	function div2_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			contentsAnimated = $$value;
			$$invalidate(3, contentsAnimated);
		});
	}

	function div3_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			contentsWrapper = $$value;
			$$invalidate(4, contentsWrapper);
		});
	}

	function div4_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			popover = $$value;
			$$invalidate(0, popover);
		});
	}

	$$self.$$set = $$props => {
		if ("trigger" in $$props) $$invalidate(12, trigger = $$props.trigger);
		if ("$$scope" in $$props) $$invalidate(14, $$scope = $$props.$$scope);
	};

	return [
		popover,
		w,
		triggerContainer,
		contentsAnimated,
		contentsWrapper,
		translateY,
		translateX,
		$isOpen,
		$isClosing,
		isOpen,
		isClosing,
		doOpen,
		trigger,
		close,
		$$scope,
		slots,
		onwindowresize,
		div0_binding,
		div2_binding,
		div3_binding,
		div4_binding
	];
}

class Popover extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { trigger: 12, close: 13 });
	}

	get close() {
		return this.$$.ctx[13];
	}
}

export default Popover;