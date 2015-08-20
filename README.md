# Spark
Experimental JSON event store.

### Store an event
POST /api/events/:collection

### Query events
GET /api/events/:collection

### Filters
Ok if we want this at runtime:

	$and($eq(type, 'frotz'), $contains('foo', 'bar', 'quux', e.tags)) 

How can we make it easy to pass?