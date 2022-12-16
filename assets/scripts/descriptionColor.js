const lighten = color => {
  while (!tinycolor.isReadable(color, '#202124'))
    color.lighten();

  return color;
};

const fixDescription = async () => {
  const descriptionContainer = document.getElementById("ttDescription");
  if (!descriptionContainer)
    return;

  const descendants = descriptionContainer.getElementsByTagName("*");
  for (const descendant of Array.from(descendants)) {
    const style = getComputedStyle(descendant);
    if (!('color' in style))
      continue;

    const currentColor = tinycolor(style.color);
    const grayColor    = tinycolor(style.color).greyscale();
    if (tinycolor.equals(currentColor, grayColor)) {
      descendant.style.color = '#ccc';
      continue;
    }

    const light = lighten(tinycolor(currentColor.toHexString()));
    if (tinycolor.equals(currentColor, light))
      continue;

    descendant.style.color = light.toHexString();
  }
};

window.addEventListener('load', fixDescription);
