import { redirect } from '@sveltejs/kit';
import { AIRTABLE_API_KEY, AIRTABLE_BASE_ID } from '$env/static/private';
import type { PageServerLoad } from './$types';

const SNOWFLAKE_BASE_ID = 'appbVWrHY0lzqYSoo';
const SNOWFLAKE_TABLE_ID = 'tblSqPUl8ClZryLXF';
const EMAIL_FIELD_ID = 'fldZT4TVYAWsmYO1r';
const SNOWFLAKE_FIELD_ID = 'fldgUFwDtFtUBijTL';

interface AirtableAttachment {
	id: string;
	url: string;
	filename: string;
	type: string;
	thumbnails?: {
		small: { url: string };
		large: { url: string };
	};
}

const REDEEM_LINK_FIELD_ID = 'fldh1XBsUI9oKjAPa';

interface ShopItem {
	id: string;
	name: string;
	cost: string;
	snowflakeCost: number | null;
	redeemLink: string | null;
	image: string | null;
	order: number;
}

interface AirtableRecord {
	id: string;
	fields: {
		'Item Name': string;
		Cost: string;
		Image?: AirtableAttachment[];
		Order?: number;
		[key: string]: unknown;
	};
}

interface AirtableResponse {
	records: AirtableRecord[];
}

async function fetchSnowflakeCount(email: string, apiKey: string): Promise<number | null> {
	const filterFormula = encodeURIComponent(`{${EMAIL_FIELD_ID}} = '${email}'`);

	const response = await fetch(
		`https://api.airtable.com/v0/${SNOWFLAKE_BASE_ID}/${SNOWFLAKE_TABLE_ID}?filterByFormula=${filterFormula}`,
		{
			headers: {
				Authorization: `Bearer ${apiKey}`,
				'Content-Type': 'application/json'
			}
		}
	);

	if (!response.ok) {
		console.error('Snowflake Airtable fetch failed:', response.statusText);
		return null;
	}

	const data = await response.json();

	if (data.records.length === 0) {
		return null;
	}

	return (data.records[0].fields[SNOWFLAKE_FIELD_ID] as number) ?? 0;
}

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(302, '/landing');
	}

	const [shopResponse, snowflakeCount] = await Promise.all([
		fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Shop`, {
			headers: {
				Authorization: `Bearer ${AIRTABLE_API_KEY}`,
				'Content-Type': 'application/json'
			}
		}),
		fetchSnowflakeCount(locals.user.email, AIRTABLE_API_KEY)
	]);

	let items: ShopItem[] = [];

	if (shopResponse.ok) {
		const data: AirtableResponse = await shopResponse.json();

		items = data.records
			.map((record) => {
				const cost = record.fields.Cost;
				const snowflakeMatch = cost.match(/^(\d+)\s*Snowflakes?$/i);
				const snowflakeCost = snowflakeMatch ? parseInt(snowflakeMatch[1], 10) : null;
				const redeemLink = (record.fields[REDEEM_LINK_FIELD_ID] as string) ?? null;

				return {
					id: record.id,
					name: record.fields['Item Name'],
					cost,
					snowflakeCost,
					redeemLink,
					image: record.fields.Image?.[0]?.url ?? null,
					order: record.fields.Order ?? 999
				};
			})
			.sort((a, b) => a.order - b.order);
	} else {
		console.error('Airtable fetch failed:', shopResponse.statusText);
	}

	return { items, snowflakeCount };
};
