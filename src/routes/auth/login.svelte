<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import reporter from '@felte/reporter-tippy';
	import { loginSchema } from './validations';
	import FirebaseAuth from '$lib/firebase/auth';
	import { goto } from '$app/navigation';

	const Auth = new FirebaseAuth();

	const google = '/img/google.svg';

	const { form } = createForm({
		onSubmit: async (values) => {
			try {
				await login(values);
			} catch (error) {
				console.log('Error');
			}
		},
		validateSchema: loginSchema,
		extend: [validator, reporter()]
	});

	const login = async (values: any) => {
		const { email, password, rememberMe } = values;
		try {
			await Auth.signInWithEmail(email, password, rememberMe);
			goto('/');
		} catch (error) {
			console.log('Error login in:', error);
		}
	};
</script>

<div class="container mx-auto px-4 mt-12 align-middle">
	<div class="flex content-center items-center justify-center h-full">
		<div class="w-full lg:w-6/12 px-4">
			<div
				class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0"
			>
				<div class="rounded-t mb-0 px-6 py-6">
					<div class="text-center mb-3">
						<h6 class="text-blueGray-500 text-sm font-bold">Ingresar usando</h6>
					</div>
					<div class="btn-wrapper text-center">
						<button
							class="bg-white active:bg-blueGray-50 text-blueGray-700 px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
							type="button"
						>
							<img alt="..." class="w-5 mr-1" src={google} />
							Google
						</button>
					</div>
					<hr class="mt-6 border-b-1 border-blueGray-300" />
				</div>
				<div class="flex-auto px-4 lg:px-10 py-10 pt-0">
					<div class="text-blueGray-400 text-center mb-3 font-bold">
						<small>O con tus credenciales</small>
					</div>
					<form use:form>
						<div class="relative w-full mb-3">
							<label
								class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
								for="grid-email"
							>
								Email
							</label>
							<input
								id="grid-email"
								type="email"
								class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
								placeholder="Email"
								name="email"
							/>
						</div>

						<div class="relative w-full mb-3">
							<label
								class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
								for="grid-password"
							>
								Password
							</label>
							<input
								id="grid-password"
								type="password"
								class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
								placeholder="Password"
								name="password"
							/>
						</div>
						<div>
							<label class="inline-flex items-center cursor-pointer">
								<input
									id="rememberMe"
									type="checkbox"
									class="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
									name="rememberMe"
								/>
								<span class="ml-2 text-sm font-semibold text-blueGray-600"> Recordarme </span>
							</label>
						</div>

						<div class="text-center mt-6">
							<button
								class="btn text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
								type="submit"
							>
								Ingresar
							</button>
						</div>
					</form>
				</div>
			</div>
			<div class="flex flex-wrap mt-6 relative">
				<div class="w-1/2">
					<a href="/auth/forgot" on:click={(e) => e.preventDefault()} class="text-blueGray-200">
						<small>Olvidaste tu password?</small>
					</a>
				</div>
				<div class="w-1/2 text-right">
					<a href="/auth/register" class="text-blueGray-200">
						<small>Ingresar</small>
					</a>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.container {
		height: 100vh - 4rem;
	}
</style>
