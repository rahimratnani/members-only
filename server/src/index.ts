#!/usr/bin/env node

import app from './app';
import { connect } from './utils/db';

const port = process.env.PORT || 3000;

// mongoose
connect();

app.listen(port, () => console.log(`Listening on port ${port}`));
