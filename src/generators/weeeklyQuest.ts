import { RawGameMaster } from '../../generated/index.js';
import { FileGenerator } from '../type/fileGenerator.js';
import { ClientQuestTemplate } from '../types.js';

export default class PokemonSettingGenerator extends FileGenerator {
    getFileName(): string {
        return 'weekly-quest.json';
    }

    async getFileContent(): Promise<string> {
        const raw: ClientQuestTemplate[] = await RawGameMaster.getClientQuestTemplate();
        const quests = raw
            .filter((quest) => quest.templateId.startsWith('WEEKLY_CHALLENGE'))
            .map((quest) => ({
                id: quest.data.quest.questId,
                achievement: { type: quest.data.quest.questType, goal: quest.data.quest.goal },
                reward: quest.data.quest.questRewards,
            }));
        return JSON.stringify(quests, null, 2);
    }
}
