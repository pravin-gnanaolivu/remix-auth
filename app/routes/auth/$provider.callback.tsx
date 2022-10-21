// app/routes/auth/$provider.callback.tsx
import { ActionFunction, LoaderFunction } from '@remix-run/node';
import invariant from 'tiny-invariant';
import { authenticator } from '~/services/auth.server';

export let loader: LoaderFunction = ({ request, params }) => {

  invariant(params.provider, 'params should contain provider')

  return authenticator.authenticate(params.provider, request, {
    successRedirect: '/',
    failureRedirect: '/login',
  });
};