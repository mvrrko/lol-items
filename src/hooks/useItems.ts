import { useState, useEffect } from 'react';
import type { Item, DataDragonResponse } from '../types';
import { transformDataDragonItem, filterValidItems } from '../utils/itemUtils';
import { MOCK_ITEMS } from '../data/mockItems';

export function useItems() {
  const [items, setItems] = useState<Item[]>([]);
  const [itemsById, setItemsById] = useState<{ [key: string]: Item }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [version, setVersion] = useState<string>('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);

        // Fetch the latest version
        const versionsResponse = await fetch(
          'https://ddragon.leagueoflegends.com/api/versions.json'
        );
        const versions: string[] = await versionsResponse.json();
        const latestVersion = versions[0];
        setVersion(latestVersion);

        // Fetch item data
        const itemsResponse = await fetch(
          `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/en_US/item.json`
        );
        const itemsData: DataDragonResponse = await itemsResponse.json();

        // Transform and filter items
        const transformedItems: { [key: string]: Item } = {};
        Object.entries(itemsData.data).forEach(([itemId, rawItem]) => {
          transformedItems[itemId] = transformDataDragonItem(itemId, rawItem);
        });

        const validItems = filterValidItems(transformedItems);
        setItems(validItems);
        setItemsById(transformedItems);
        setError(null);
      } catch (err) {
        console.error('Error fetching items, using mock data:', err);
        // Fallback to mock data
        const validItems = filterValidItems(MOCK_ITEMS);
        setItems(validItems);
        setItemsById(MOCK_ITEMS);
        setVersion('14.1.1'); // Mock version
        setError('Using offline data');
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  return { items, itemsById, loading, error, version };
}
