<template>
  <div class="min-h-screen">
    <header class="pb-24">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div
          class="relative py-5 flex items-center justify-center lg:justify-between"
        >
          <div class="absolute left-0 flex-shrink-0 lg:static">
            <span class="inline-block float-left text-black text-2xl font-bold">
              Magento 2 Model Generator
            </span>
          </div>
        </div>
      </div>
    </header>

    <main class="-mt-24 pb-8">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 class="sr-only">Magento 2 model generator</h1>
        <div class="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
          <!-- Left column -->
          <div class="grid grid-cols-1 gap-4 lg:col-span-2">
            <section aria-labelledby="module-details">
              <h2 id="module-details" class="sr-only">Enter model details</h2>
              <div class="rounded-lg bg-white overflow-hidden shadow">
                <div class="p-6">
                  <div class="space-y-8 divide-y divide-gray-200">
                    <ModuleName />

                    <ModelInformation />

                    <DefineModelColumns />

                    <AdminGrid />
                  </div>
                </div>
              </div>
            </section>
          </div>

          <!-- Right column -->
          <div class="grid grid-cols-1 gap-4">
            <section aria-labelledby="top-sidebar">
              <h2 id="top-sidebar" class="sr-only">File list</h2>
              <div class="rounded-lg bg-white overflow-hidden shadow">
                <div class="p-6">
                  <TopSidebar />
                </div>
              </div>
            </section>

            <section aria-labelledby="bottom-sidebar">
              <h2 id="bottom-sidebar" class="sr-only">File list</h2>
              <div class="rounded-lg bg-white overflow-hidden shadow">
                <div class="p-6">
                  <BottomSidebar />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
    <footer>
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
        <div
          class="text-center border-t border-gray-200 py-8 text-sm text-gray-500 text-center"
        >
          <p>
            <a
              class="underline"
              href="https://github.com/michielgerritsen/magento2-model-generator"
              target="_blank"
            >
              Source code available on GitHub.
            </a>
            &copy; {{ year }}
            <a class="underline" href="https://www.controlaltdelete.nl/"
              >Control Alt Delete</a
            >
            and
            <a class="underline" href="https://www.michiel-gerritsen.com/"
              >Michiel-Gerritsen.com</a
            >.
          </p>

          <p class="mt-4 font-bold">
            Want to stay up to date on the latest in the Magento community? Subscribe to our bi-weekly newsletter on
            <a class="underline" href="https://www.magedispatch.com/?utm_source=model-generator.com&utm_medium=tool&utm_campaign=footer-link"
            >MageDispatch.com.</a
            >
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()

useHead({
  title: 'Magento 2 Model Generator',
})
</script>
