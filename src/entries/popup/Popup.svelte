<script lang="ts">
  import { runtime } from "webextension-polyfill";
  import NorthwesternLogo from "$lib/components/NorthwesternLogo.svelte";
  import HelpLink from "$lib/components/HelpLink.svelte";
  import "$styles/app.css";

  function openOptionsPage(): void {
    runtime.openOptionsPage();
    window.close();
  }
</script>

<main>
  <header class="bg-purple">
    <nav class="mx-auto px-4">
      <div class="flex items-center pb-4 whitespace-nowrap">
        <div>
          <div class="mx-auto flex h-10 w-32 items-center justify-center">
            <NorthwesternLogo />
          </div>
          <div class="text-center">
            <h3 class="text-lg font-medium leading-6 text-white">
              TeamDynamix Extension
            </h3>
          </div>
        </div>
      </div>
    </nav>
  </header>
  <div class="bg-white dark:bg-dark">
    <div class="border-b border-gray-200 dark:border-gray-500 py-2 px-4">
      <div class="py-5">
        <button
          on:click={openOptionsPage}
          type="button"
          class="inline-flex w-full p-2 justify-center uppercase border border-transparent transition-all duration-300 ease-in-out bg-purple hover:bg-purple-light dark:hover:bg-purple-dark-hover px-4 py-2 text-base font-medium text-white dark:hover:text-gray-300 shadow-sm  focus:outline-none focus:ring-1 focus:ring-purple-light focus:ring-offset-2"
          >Options</button
        >
      </div>
    </div>
    <div class="py-2">
      <div class="flex items-center justify-center">
        <HelpLink />
      </div>
    </div>
  </div>
</main>
