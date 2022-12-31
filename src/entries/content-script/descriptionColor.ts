import tinycolor from "tinycolor2";

const lighten = (color: tinycolor.Instance, bkgnd: string) => {
  while (!tinycolor.isReadable(color, bkgnd)) color.lighten();

  return color;
};

const fixColors = (descendant: HTMLElement, bkgnd: string) => {
  const style = getComputedStyle(descendant);
  if (!("color" in style)) return;

  const currentColor = tinycolor(style.color);
  const grayColor = tinycolor(style.color).greyscale();
  if (tinycolor.equals(currentColor, grayColor)) {
    descendant.style.color = "#ccc";
    return;
  }

  const light = lighten(tinycolor(currentColor.toHexString()), bkgnd);
  if (tinycolor.equals(currentColor, light)) return;

  descendant.style.color = light.toHexString();
};

const fixDescription = async () => {
  const descriptionContainer = document.getElementById("ttDescription");
  if (
    !descriptionContainer ||
    typeof descriptionContainer.dataset.fixed !== "undefined"
  )
    return;

  descriptionContainer.dataset.fixed = "true";

  const descendants = descriptionContainer.getElementsByTagName("*");
  for (const descendant of Array.from(descendants) as Array<HTMLElement>) {
    fixColors(descendant, "#202124");
  }
};

const fixFeedItems = async () => {
  const feedItems = document.querySelectorAll(
    '.feed-body .feed-child-box:not([data-fixed="true"]), .feed-body .WordSection1:not([data-fixed="true"])'
  );
  for (const item of Array.from(feedItems) as Array<HTMLElement>) {
    item.dataset.fixed = "true";
    const descendants = <HTMLCollectionOf<HTMLElement>>(
      item.getElementsByTagName("*")
    );
    for (const descendant of descendants) fixColors(descendant, "#33353a");
  }
};

const fixAll = () => {
  fixDescription();
  fixFeedItems();
};

export default function descriptionColor() {
  const observer = new MutationObserver(fixAll);

  observer.observe(document, {
    subtree: true,
    childList: true,
    attributes: true,
  });

  fixAll();
}
