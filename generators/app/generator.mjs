import { relative } from 'node:path';
import BaseApplicationGenerator from 'generator-jhipster/generators/base-application';
import command from './command.mjs';
import { DEFAULT_IONIC_PATH, IONIC_NAMESPACE } from '../constants.mjs';

export default class extends BaseApplicationGenerator {
  constructor(args, opts, features) {
    super(args, opts, { ...features, sbsBlueprint: true });
  }

  beforeQueue() {
    if (this.blueprintConfig.appDir) {
      throw new Error('jhipster-ionic:app generator must run in backend application directory');
    }
  }

  get [BaseApplicationGenerator.INITIALIZING]() {
    return this.asInitializingTaskGroup({
      async initializingTemplateTask() {
        this.parseJHipsterArguments(command.arguments);
        this.parseJHipsterOptions(command.options);
      },
      loadConfigFromJHipster() {
        if (this.options.defaults || this.options.force) {
          this.blueprintStorage.defaults({ ionicDir: DEFAULT_IONIC_PATH });
        }
      },
    });
  }

  get [BaseApplicationGenerator.PROMPTING]() {
    return this.asPromptingTaskGroup({
      async promptyForIonicDir() {
        await this.prompt(
          [
            {
              type: 'input',
              name: 'ionicDir',
              message: 'Where do you want to generate an Ionic application?',
              default: DEFAULT_IONIC_PATH,
            },
          ],
          this.blueprintStorage,
        );
        this.blueprintStorage.defaults({ ionicDir: DEFAULT_IONIC_PATH });
      },
    });
  }

  get [BaseApplicationGenerator.COMPOSING]() {
    return this.asComposingTaskGroup({
      async composeIonic() {
        if (this.jhipsterConfig.applicationType === 'microservice') return;
        const ionicDir = this.destinationPath(this.blueprintConfig.ionicDir);
        const appDir = relative(ionicDir, this.destinationPath());
        await this.composeWithJHipster(`${IONIC_NAMESPACE}:ionic`, {
          generatorOptions: {
            destinationRoot: ionicDir,
            appDir,
          },
        });
      },
    });
  }
}
