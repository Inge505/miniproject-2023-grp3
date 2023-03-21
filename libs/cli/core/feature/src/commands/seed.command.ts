// import { SomeService } from '@mp/api/some/feature';
import { Command, CommandRunner } from 'nest-commander';

@Command({
  name: 'seed',
  description: 'Seeding data in the database',
})
export class SeedCommand extends CommandRunner {
  // constructor(
  //   private readonly service: SomeService
  // ) {
  //   super();
  // }

  async run(): Promise<void> {
    // try {
    //   const response = await this.service.createSomething({
    //     slug: 'example',
    //     name: 'Example Campaign',
    //     tags: ['Tag 1', ' Tag 2'],
    //     description: 'Some description here.',
    //     photoURL: null,
    //   });
    //   const campaign = response.campaign;
    //   console.log(campaign);
    // } catch (error) {
    //   console.log(error);
    // }
  }
}
