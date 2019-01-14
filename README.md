# Search by tag/s (search_by_tags)


## How to use

```javascript
const { searchByTags } = require('search_by_tags');
// Parse your query url to this => ['eq:a|b', 'eq:c', 'not:d']
// Meaning:
// - tag must contain `c`
// - tag must contains `a` or `b`
// - tag must NOT contains `d`
const res = searchByTags(['eq:a|b', 'eq:c', 'not:d']);
// req.eqAnd = ['c']
// req.eqOr = ['a', 'b']
// req.notEqAnd = ['d']
```

## Example
- From input url like `https://api.example.com?tags=eq:a&tags=eq:b|c&tags=not:d`
- To output:
```js
{
  eqAnd: ['a'],
  eqOr: ['b','c'],
  notEqAnd: ['d']
}
```

## Tests
- `npm test`

