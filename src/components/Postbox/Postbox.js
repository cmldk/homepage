import { Fragment, useState } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { useTranslation } from 'react-i18next';
import { BASE_URL } from '../../lib/constants';
import { useData } from '../../DataProvider';
import Icon from '../Base/Icon/Icon';

export default function Postbox() {
  const { t } = useTranslation();
  const { suggestion } = useData();

  const [content, setContent] = useState('');
  const [postboxSended, setPostboxSended] = useState(
    localStorage.getItem('postbox') || false
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      data: [
        {
          columns: [
            {
              column_id: suggestion?.insert_column_id,
              cell_value: content,
            },
          ],
        },
      ],
    };

    const SUGGESTION_TABLE_ID = suggestion.suggestions_table_id;
    const API_SUGGESTION_RETABLE_URL = `${BASE_URL}/${SUGGESTION_TABLE_ID}/json`;

    // try {
    //   let response = await fetch(API_SUGGESTION_RETABLE_URL, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(payload),
    //   });
    //   if (!response.ok) {
    //     throw new Error(`HTTP error! status: ${response.status}`);
    //   }
    //   localStorage.setItem('postbox', true);
    //   setPostboxSended(true);
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    suggestion && (
      <div className="fixed bottom-5 right-5 font-['regular']">
        <Popover className="relative inline-block">
          <Popover.Button className="p-4 flex items-center bg-portakal hover:bg-orange-400 rounded-full shadow">
            <Icon iconName={'BsMailbox2'} className={'h-7 w-7 text-dark'} />
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 -translate-y-1"
            enterTo="opacity-100"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0 translate-y-full"
          >
            <Popover.Panel className="absolute z-20 -translate-y-full -mt-20 -translate-x-[16rem] w-80">
              {postboxSended ? (
                <div className="overflow-hidden shadow sm:rounded-md">
                  <div className="bg-gray-200 dark:bg-gray-700 dark:text-gray-200 px-4 py-3 flex items-center">
                    <Icon
                      iconName={'BsCheckCircleFill'}
                      className={'h-16 w-16 dark:text-gray-200 mr-2'}
                    />
                    <p>{t('postbox_thanks')}</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} method="POST">
                  <div className="overflow-hidden shadow sm:rounded-md">
                    <div className="bg-gray-200 dark:bg-gray-700 px-4 pt-3 pb-1">
                      <span className="text-base text-sm leading-6 text-gray-900 dark:text-light">
                        {t('suggestion_title')}
                      </span>

                      <div className="mt-2">
                        <textarea
                          id="about"
                          rows={5}
                          className="resize-none mt-1 block w-full dark:bg-gray-200 rounded-md p-1.5 border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 text-sm"
                          defaultValue={''}
                          maxLength={5000}
                          onChange={(e) =>
                            e.target.checkValidity() &&
                            setContent(e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between bg-gray-200 dark:bg-gray-700 px-4 py-3">
                      {/* <div className="text-xs text-gray-900 dark:text-light">
              <p>Total: 100</p>
              <p>Read: 100</p>
              <p>Unread: 100</p>
            </div> */}
                      <span className="ml-auto">
                        <button
                          type="submit"
                          className="rounded-md bg-portakal py-2 px-3 text-sm text-light shadow-sm hover:bg-orange-400"
                        >
                          {t('drop')}
                        </button>
                      </span>
                    </div>
                  </div>
                </form>
              )}
            </Popover.Panel>
          </Transition>
        </Popover>
      </div>
    )
  );
}
