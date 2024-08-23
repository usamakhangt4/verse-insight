"use client"
import Link from 'next/link';
import {DarkModeToggle} from './DarkModeToggle';
import {Button} from './ui/button';
import {Card} from './ui/card';
import {auth} from '@/lib/firebase';
import {useAuthState} from 'react-firebase-hooks/auth'
import {Avatar, AvatarFallback, AvatarImage} from './ui/avatar';
import {Skeleton} from './ui/skeleton';
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger} from './ui/dropdown-menu';

const Navbar = () => {
  const [user, loading] = useAuthState(auth);

  return (
    <nav >
      <Card className={`p-4 flex justify-between items-center shadow-md fixed top-0 w-full h-[68px] rounded-none z-50`}>
        {/* App Logo */}
        <div className="text-xl font-bold">
          <a href="/">Verse Insight</a>
        </div>

        {/* Navbar Links Start*/}
        {/* Navbar Links End*/}

        {/* Action Buttons Start */}
        <div className="flex items-center space-x-4">
          <DarkModeToggle />

          {(!user && loading) &&
            <>
              <Skeleton className="h-10 w-[78px] rounded-md" />
              <Skeleton className="h-10 w-10 rounded-full" />
            </>}

          {(!user && !loading) && <Button asChild>
            <Link href="/login">Login</Link>
          </Button>}
          {
            user &&
            <>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src={user?.photoURL ?? ''} alt={user.displayName ?? ''} />
                    <AvatarFallback>{user.displayName?.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>{user.displayName}</DropdownMenuLabel>
                  <DropdownMenuItem disabled className='pt-0 mt-0'>{user.email}</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className='cursor-pointer' onClick={async () => await auth.signOut()}>
                    Logout
                  </DropdownMenuItem>

                </DropdownMenuContent>
              </DropdownMenu>
            </>
          }

        </div>

        {/* Action Buttons End */}
      </Card>
    </nav >
  );
};

export default Navbar;
