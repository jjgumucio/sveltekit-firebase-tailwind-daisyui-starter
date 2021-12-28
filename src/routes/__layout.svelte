<script lang="ts">
	import '../app.css';
	import 'tippy.js/dist/tippy.css';
	import AuthAPI from '$lib/firebase/auth';

	const Auth = new AuthAPI();

	Auth.onAuthStateChange();
</script>

<slot />
