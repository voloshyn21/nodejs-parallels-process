const jobsQueue = [
  {id: 1, duration: 100},
  {id: 2, duration: 2000},
  {id: 3, duration: 500},
  {id: 4, duration: 1000},
  {id: 5, duration: 200},
  {id: 6, duration: 1500},
  {id: 7, duration: 500}
];

async function processJob(job) {
  const {id, duration} = job;

  console.log(`Start: ${id}`);

  await new Promise(resolve => setTimeout(resolve, duration));

  console.log(`Finished: ${id} with duration ${duration} ms`);
}

async function processOneParallels() {
  const job = jobsQueue.shift();

  if (!job) return 0;

  await processJob(job);

  await processOneParallels();
}

async function processAll(parallels = 1) {
  const parallelsJobs = [];

  for (let parallel = 0; parallel < parallels; parallel++) {
    parallelsJobs.push(processOneParallels);
  }

  await Promise.all(parallelsJobs.map(parallelJob => parallelJob()));
}

async function start() {
  try {
    const parallelsWork = 2;

    await processAll(parallelsWork);

    console.log('Finished all');
  } catch (error) {
    console.error(error);
  }
}

start();
