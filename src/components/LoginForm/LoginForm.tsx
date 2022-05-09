import { useAuth } from "components/AuthProvider/hooks";
import { Field, Form, Formik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { validatePassword, validateUsername } from "utils/validations";

interface Props {}

const LoginForm: React.FC<Props> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const initialValues = { username: "", password: "" };

  // typescript error on location.state
  const from = (location.state as any)?.from?.pathname || "/";

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        actions.setSubmitting(false);
        auth.signin({ username: values.username }, () =>
          navigate(from, { replace: true })
        );
      }}
    >
      {({ errors, touched }) => {
        console.log(errors);
        return (
          <Form>
            <div>
              <label htmlFor="username">Username</label>
              <Field
                id="username"
                name="username"
                placeholder="Mario Rossi"
                validate={validateUsername}
              />
              {errors.username && touched.username && (
                <div>{errors.username}</div>
              )}
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <Field
                id="password"
                name="password"
                placeholder="password"
                validate={validatePassword}
              />
              {errors.password && touched.password && (
                <div>{errors.password}</div>
              )}
            </div>
            <button type="submit">Submit</button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default LoginForm;
