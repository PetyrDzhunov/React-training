import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ValidationError from '../ValidationError/ValidationError';
import useHttp from '../../hooks/useHttp';

const initialValue = { email: '', password: '' };

const validationSchema = {
	email: Yup.string().email('Invalid email'),
	password: Yup.string().min(6, 'Minimum 6 characters required.')
};

const GenericForm = () => {
	const { error, isLoading, sendRequest, clearError } = useHttp();

	return (
		<Formik initialValues={initialValue}
			validationSchema={Yup.object(validationSchema)}
			onSubmit={(values, { setIsSubmitting }) => {
				sendRequest('http://localhost:5000/register', 'POST',
					JSON.stringify(values),
					{ 'Content-Type': 'application/json' }
				)
					.then(resData => console.log(resData))
					.catch(err => {
						console.log(error);
					});
			}}
		>
			<Form style={{ backgroundColor: "aqua" }}>
				<div>
					<label htmlFor="email">Email</label>
					<Field name="email" />
				</div>
				<ErrorMessage name="email" component={ValidationError}></ErrorMessage>

				<div>
					<label htmlFor="password">Password</label>
					<Field name="password" type="password" />
				</div>
				<ErrorMessage name="password" component={ValidationError}></ErrorMessage>
				<hr />
				<input stlye={{ display: "block" }} type="submit" value="Submit" />
				{error && <ValidationError>{error}</ValidationError>}
			</Form>
		</Formik>
	);
};

export default GenericForm;
