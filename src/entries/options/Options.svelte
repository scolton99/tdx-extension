<script lang="ts">
  import { extensionConfig } from "$lib/store";
  import { configHandler } from "$lib/store";
  import "$styles/app.css";

  export const categorizedFeatures = Object.entries(configHandler).reduce(
    (group, [key, feature]) => {
      const { category } = feature;
      group[category] = group[category] ?? [];
      group[category].push({ key, feature });
      return group;
    },
    {} as Record<number, { key: FeatureKey; feature: FeatureDetails }[]>
  );
</script>

<div class="px-4 dark:bg-dark">
  <div>
    {#each Object.entries(categorizedFeatures) as [categoryName, features]}
      <div class="mx-auto max-w-none">
        <div class="overflow-hidden rounded-lg sm:shadow">
          <div
            class="py-4 mb-4 border-b-2 border-gray-200 dark:border-gray-500"
          >
            <div
              class="flex flex-wrap items-center justify-between -mt-4 sm:flex-nowrap"
            >
              <div class="mt-4">
                <h3
                  class="text-xl font-bold leading-6 capitalize text-purple dark:text-purple-light"
                >
                  {categoryName}
                </h3>
              </div>
            </div>
          </div>

          <ul class="mt-2 divide-y divide-gray-100 dark:divide-neutral-700">
            {#each Object.entries(features) as [_, { key, feature }]}
              <li class="flex items-center justify-between py-4">
                <div class="flex flex-col">
                  <p
                    class="font-medium text-gray-900 text-md dark:text-gray-100"
                    id="privacy-option-1-label"
                  >
                    {feature.name}
                  </p>
                  <p
                    class="text-gray-500 text-md dark:text-gray-300"
                    id="privacy-option-1-description"
                  >
                    {feature.description}
                  </p>
                </div>
                <label
                  class="relative inline-flex items-center mr-1 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    class="sr-only peer"
                    bind:checked={$extensionConfig[key]}
                  />
                  <div
                    class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-light dark:peer-focus:ring-purple-dark-hover rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple dark:peer-checked:bg-purple-light"
                  />
                </label>
              </li>
            {/each}
          </ul>
        </div>
      </div>
    {/each}
  </div>
</div>
