import { NextResponse } from "next/server";

export const fetchClients = async (access_token: string) => {
  const query = `
        SELECT 
          customer_client.id
        FROM customer_client 
        WHERE customer_client.status = 'ENABLED' 
        AND customer_client.manager = FALSE
      `;

  const response = await fetch(
    `https://googleads.googleapis.com/v23/customers/${process.env.MCC_ID}/googleAds:search`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "developer-token": process.env.DEVELOPER_TOKEN!,
        Authorization: `Bearer ${access_token}`,
        "login-customer-id": process.env.MCC_ID!, // Key: authenticating as the Manager
      },
      body: JSON.stringify({ query }),
    },
  );

  const parsedData = await response.json();

  if (!response.ok) {
    return NextResponse.json(
      { error: parsedData.error },
      { status: response.status },
    );
  }
  const customerData = parsedData.results || [];

  console.log(customerData);

  if (!parsedData) {
    throw new Error("No accessible customers found");
  }

  const customerIds =
    customerData.length > 0 &&
    customerData.map((customer: any) => {
      return customer.customerClient.id;
    });

  return customerIds;
};
