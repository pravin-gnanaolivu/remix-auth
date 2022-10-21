import { ActionFunction, LoaderFunction, redirect } from '@remix-run/node';
import invariant from 'tiny-invariant';
import { authenticator } from '~/services/auth.server';

export let loader: LoaderFunction = () => redirect('/login');

export let action: ActionFunction = ({ request, params }) => {
  invariant(params.provider, 'params should contain provider')
  return authenticator.authenticate(params.provider, request);
};