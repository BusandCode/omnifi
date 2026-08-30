import { Redirect } from 'expo-router';

export default function SpendingAnalyticsIndex() {
//   return <Redirect href="/spending-analytics/month" />;
return <Redirect href={`/spending-analytics/month` as any} />;
}