import { ref, watchEffect } from "vue";

export function useHeadManager() {
  const headElements = ref([]);

  const setHeadElements = (elements) => {
    headElements.value = elements;
  };

  watchEffect(() => {
    document.head
      .querySelectorAll("[data-dynamic-head]")
      .forEach((el) => el.remove());
    headElements.value.forEach((el) => {
      const element = document.createElement(el.tag);
      Object.keys(el.attrs).forEach((attr) => {
        element.setAttribute(attr, el.attrs[attr]);
      });
      element.setAttribute("data-dynamic-head", "true");
      document.head.appendChild(element);
    });
  });

  return { setHeadElements };
}
