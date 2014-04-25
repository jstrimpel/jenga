# jenga

> fuck z-indexes

A long time ago, in a galaxy far, far away (Southeast Texas, early 90s; think Dazed and Confused but 
worse music)... I was partying one night. A good friend of mine, James, was carefully setting up Jenga for what 
seemed to be an eternity, but was likely only 5 minutes. No sooner than he had completed the game set up another 
good friend of mine, Richard, walked into the room shouted "Fuck Jenga!" and kicked it over. The way James felt 
about Richard at that point and time was the way that most developers have felt about managing z-indexes given 
the complexity of [stacking contexts](http://www.w3.org/TR/CSS21/zindex.html).

## Disclaimer
Jenga is highly experimental and untested.

## Usage
Jenga can be used to adjust z-indexes, find an element’s stacking context, and determine if an element creates a stacking context.

```javascript
// el - the element of interest
// createStackingCtx - if el.parentNode doesn't create a stacking
// context then force a stacking context on el.parentNode
// root - if createStackingCtx is false the element at which to
// stop traversing and adjusting z-indexes

// sends an element to the top of a stacking context
jenga.bringToFront(el, [createStackingCtx], [root]);

// sends an element to the bottom of a stacking context
jenga.sendToBack(el, [createStackingCtx], [root]);

// does the element create a stacking context
jenga.isStackingCtx(el);

// gets an element's stacking context
jenga.getStackingCtx(el);
```

## jQuery Plugin
For those of you who prefer your code in plugin form. Options are, well optional.
```javascript
$(selector).bringToFront({
   createStackingCtx: true,
   root: el
});

$(selector).sendToBack({
   createStackingCtx: true,
   root: el
});

$(selector).isStackingCtx();

$(selector).getStackingCtx();
```
