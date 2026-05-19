'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { updateCustomer, updateCustomerAddress, addCustomerAddress } from '@/lib/shopify';

export async function updateProfileAction(formData: FormData) {
  const cookieStore = await cookies();
  const token = cookieStore.get('shopify_customer_token')?.value;

  if (!token) return { error: 'Not authenticated' };

  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const phone = formData.get('phone') as string;

  const res = await updateCustomer(token, { firstName, lastName, phone });

  if (!res) {
    return { error: 'Failed to update profile. Please try again.' };
  }
  if (res.customerUserErrors?.length > 0) {
    return { error: res.customerUserErrors[0].message };
  }

  revalidatePath('/account');
  return { success: true };
}

export async function updateAddressAction(formData: FormData) {
  const cookieStore = await cookies();
  const token = cookieStore.get('shopify_customer_token')?.value;

  if (!token) return { error: 'Not authenticated' };

  const addressId = formData.get('addressId') as string;
  const address1 = formData.get('address1') as string;
  const city = formData.get('city') as string;
  const province = formData.get('province') as string;
  const zip = formData.get('zip') as string;
  const country = formData.get('country') as string;

  const res = await updateCustomerAddress(token, addressId, {
    address1,
    city,
    province,
    zip,
    country,
  });

  if (!res) {
    return { error: 'Failed to update address. Please try again.' };
  }
  if (res.customerUserErrors?.length > 0) {
    return { error: res.customerUserErrors[0].message };
  }

  revalidatePath('/account');
  return { success: true };
}

export async function addAddressAction(formData: FormData) {
  const cookieStore = await cookies();
  const token = cookieStore.get('shopify_customer_token')?.value;

  if (!token) return { error: 'Not authenticated' };

  const address1 = formData.get('address1') as string;
  const city = formData.get('city') as string;
  const province = formData.get('province') as string;
  const zip = formData.get('zip') as string;
  const country = formData.get('country') as string;

  const res = await addCustomerAddress(token, {
    address1,
    city,
    province,
    zip,
    country,
  });

  if (!res) {
    return { error: 'Failed to add address. Please try again.' };
  }
  if (res.customerUserErrors?.length > 0) {
    return { error: res.customerUserErrors[0].message };
  }

  revalidatePath('/account');
  return { success: true };
}
